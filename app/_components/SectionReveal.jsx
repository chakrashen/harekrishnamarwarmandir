'use client';

import useScrollReveal from '../_hooks/useScrollReveal';

export default function SectionReveal({ children, className = '', delay = 0, as: Tag = 'section' }) {
  const { ref, revealed } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${revealed ? 'revealed' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
