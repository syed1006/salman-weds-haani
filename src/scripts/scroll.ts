import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScroll(): void {
  const mm = gsap.matchMedia();

  // With reduced motion (or no JS at all) every element stays visible by
  // default — all hiding happens inside this animated branch only.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // ── Hero entrance: plays once the flash clears ──
    const heroBits = [
      '.hero-garland',
      '.chandelier',
      '.hero .eyebrow',
      '.hero-names > *',
      '.rings',
      '.hero .gold-rule',
      '.hero-date',
      '.scroll-cue',
    ];
    gsap.set(heroBits, { autoAlpha: 0 });

    document.addEventListener(
      'invitation:open',
      () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
          .fromTo('.hero-garland', { y: -70 }, { autoAlpha: 1, y: 0, duration: 1.3 })
          .fromTo(
            '.chandelier',
            { y: -90 },
            { autoAlpha: 1, y: 0, duration: 1.7, ease: 'elastic.out(1, 0.55)' },
            0.15
          )
          .to('.hero .eyebrow', { autoAlpha: 1, duration: 0.8 }, '-=1.1')
          .fromTo(
            '.hero-names > *',
            { y: 30 },
            { autoAlpha: 1, y: 0, stagger: 0.18, duration: 1 },
            '-=0.6'
          )
          .to('.rings', { autoAlpha: 1, duration: 0.7 }, '-=0.4')
          .fromTo('.hero .gold-rule', { scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.9 }, '-=0.4')
          .to(['.hero-date', '.scroll-cue'], { autoAlpha: 1, stagger: 0.15, duration: 0.7 }, '-=0.3');
      },
      { once: true }
    );

    // ── Hero drifts away in layers as you scroll on (parallax) ──
    gsap.to('.hero-inner', {
      autoAlpha: 0,
      y: -90,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true },
    });
    gsap.to('.chandelier', {
      y: -140,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 40%', scrub: true },
    });
    gsap.to('.hero-garland', {
      y: -60,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 55%', scrub: true },
    });

    // ── Every .reveal-group rises softly as it enters ──
    document.querySelectorAll<HTMLElement>('.reveal-group').forEach((group) => {
      gsap.from(group.children, {
        autoAlpha: 0,
        y: 40,
        stagger: 0.09,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 82%' },
      });
    });

    // ── Event cards drift in from alternating sides ──
    document.querySelectorAll<HTMLElement>('.event-card').forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 ? 70 : -70,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
    });

    // ── Scratch hearts pop in ──
    gsap.from('.scratch-cell', {
      scale: 0.4,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: '.scratch-row', start: 'top 82%' },
    });

    // ── Countdown tiles pop in ──
    gsap.from('.count-tile', {
      scale: 0.6,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.7,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.countdown', start: 'top 85%' },
    });

    // ── Timeline: the gold line draws down as it enters ──
    document.querySelectorAll<HTMLElement>('.timeline').forEach((tl) => {
      const line = tl.querySelector('.timeline-line');
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: tl, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
        });
      }
      gsap.from(tl.querySelectorAll('.timeline-dot'), {
        scale: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: tl, start: 'top 78%' },
      });
    });

    // ── Gold rule lines draw themselves ──
    document.querySelectorAll<HTMLElement>('section .gold-rule').forEach((rule) => {
      gsap.from(rule, {
        scaleX: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: rule, start: 'top 88%' },
      });
    });
  });
}
