import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScroll(): void {
  const mm = gsap.matchMedia();

  // With reduced motion (or no JS at all) every element stays visible by
  // default — all hiding happens inside this animated branch only.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // ── Hero entrance: plays once the curtains part ──
    const heroBits = [
      '.chandelier',
      '.hero .eyebrow',
      '.hero-names > *',
      '.rings',
      '.hero .gold-rule',
      '.hero-date',
      '.hero-guest',
      '.scroll-cue',
    ];
    gsap.set(heroBits, { autoAlpha: 0 });

    document.addEventListener(
      'invitation:open',
      () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' }, delay: 1.6 })
          .fromTo(
            '.chandelier',
            { y: -90 },
            { autoAlpha: 1, y: 0, duration: 1.7, ease: 'elastic.out(1, 0.55)' }
          )
          .to('.hero .eyebrow', { autoAlpha: 1, duration: 0.8 }, '-=0.6')
          .fromTo(
            '.hero-names > *',
            { y: 30 },
            { autoAlpha: 1, y: 0, stagger: 0.18, duration: 1 },
            '-=0.4'
          )
          .to('.rings', { autoAlpha: 1, duration: 0.7 }, '-=0.4')
          .fromTo('.hero .gold-rule', { scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.9 }, '-=0.4')
          .to(['.hero-date', '.hero-guest', '.scroll-cue'], { autoAlpha: 1, stagger: 0.15, duration: 0.7 }, '-=0.3');
      },
      { once: true }
    );

    // ── Hero drifts away as you scroll on ──
    gsap.to('.hero-inner', {
      autoAlpha: 0,
      y: -90,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true },
    });
    gsap.to('.chandelier', {
      y: -120,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 40%', scrub: true },
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
