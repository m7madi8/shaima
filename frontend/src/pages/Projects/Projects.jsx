import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowLeft, FiEye } from "react-icons/fi";
import { projects, categories } from "../../data/projects";
import { BRAND_TAGLINE } from "../../constants/brand";
import "./projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projects = () => {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const filterRef = useRef(null);
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (location.state?.filter) {
      setActiveCategory(location.state.filter);
    }
  }, [location.state]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const getCategoryName = (categoryId) => {
    const found = categories.find((cat) => cat.id === categoryId);
    return found ? found.name : categoryId;
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return projects.length;
    return projects.filter((p) => p.category === categoryId).length;
  };

  const handleFilterChange = useCallback(
    (categoryId) => {
      if (categoryId === activeCategory) return;

      const cards = gridRef.current?.querySelectorAll(".projects-card");
      if (cards && cards.length > 0) {
        gsap.to(cards, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(categoryId);
          },
        });
      } else {
        setActiveCategory(categoryId);
      }
    },
    [activeCategory]
  );

  const handleFilterKeyDown = useCallback((e) => {
    const buttons = filterRef.current?.querySelectorAll(".projects-filter__btn");
    if (!buttons) return;
    const btnArray = Array.from(buttons);
    const currentIndex = btnArray.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % btnArray.length;
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + btnArray.length) % btnArray.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = btnArray.length - 1;
    }

    if (nextIndex >= 0) {
      btnArray[currentIndex].setAttribute("tabindex", "-1");
      btnArray[nextIndex].setAttribute("tabindex", "0");
      btnArray[nextIndex].focus();
    }
  }, []);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".projects-hero__label",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          ".projects-hero__title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=0.35"
        )
        .fromTo(
          ".projects-hero__desc",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.45"
        )
        .fromTo(
          ".projects-hero__meta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.35"
        );
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-filter__btn",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-filter",
            start: "top 88%",
          },
        }
      );
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      if (!filteredProjects.length) return;
      gsap.fromTo(
        ".projects-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 88%",
          },
        }
      );
    },
    { scope: pageRef, dependencies: [activeCategory] }
  );

  return (
    <div ref={pageRef} className="projects-page">
      <header className="projects-hero">
        <div className="projects-hero__inner">
          <span className="projects-hero__eyebrow" dir="ltr">
            {BRAND_TAGLINE}
          </span>
          <span className="projects-hero__label">المعرض</span>
          <h1 className="projects-hero__title">
            أعمالي
            <br />
            <span className="projects-hero__title-accent">المختارة</span>
          </h1>
          <p className="projects-hero__desc">
            مجموعة مختارة من مشاريعي في التصميم الداخلي والخارجي، حيث يلتقي
            الذوق الراقي بالتفاصيل الدقيقة لصنع مساحات استثنائية.
          </p>
          <div className="projects-hero__meta">
            <span className="projects-hero__stat">
              <strong>{projects.length}</strong>
              مشروع
            </span>
            <span className="projects-hero__stat-divider" aria-hidden="true" />
            <span className="projects-hero__stat">
              <strong>{categories.length - 1}</strong>
              تصنيف
            </span>
          </div>
        </div>
      </header>

      <div className="projects-body">
        <nav className="projects-filter" aria-label="تصفية المشاريع حسب التصنيف">
          <div
            ref={filterRef}
            role="tablist"
            aria-label="تصنيفات المشاريع"
            onKeyDown={handleFilterKeyDown}
            className="projects-filter__inner"
          >
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleFilterChange(category.id)}
                  aria-selected={isActive}
                  aria-controls="projects-grid-panel"
                  className={`projects-filter__btn${
                    isActive ? " projects-filter__btn--active" : ""
                  }`}
                >
                  {category.name}
                  <span className="projects-filter__count">
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <section
          id="projects-grid-panel"
          role="tabpanel"
          className="projects-grid-section"
        >
          {filteredProjects.length > 0 ? (
            <div ref={gridRef} className="projects-grid">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className={`projects-card${
                    index === 0 ? " projects-card--featured" : ""
                  }`}
                  aria-label={`عرض مشروع ${project.title}`}
                >
                  <div className="projects-card__frame">
                    <img
                      src={project.coverImage}
                      alt={`صورة غلاف مشروع ${project.title}`}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="projects-card__img"
                    />
                    <span className="projects-card__index" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="projects-card__overlay">
                      <span className="projects-card__overlay-text">
                        <FiEye aria-hidden="true" />
                        عرض التفاصيل
                        <FiArrowLeft aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="projects-card__info">
                    <span className="projects-card__category">
                      {getCategoryName(project.category)}
                    </span>
                    <h2 className="projects-card__title">{project.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <span className="projects-empty__line" />
              <span className="projects-empty__eyebrow">No Projects</span>
              <p className="projects-empty__text">
                لا توجد مشاريع ضمن هذا التصنيف حالياً — يمكنك استعراض جميع أعمالي
              </p>
              <button
                type="button"
                className="projects-empty__reset"
                onClick={() => setActiveCategory("all")}
              >
                عرض جميع المشاريع
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Projects;
