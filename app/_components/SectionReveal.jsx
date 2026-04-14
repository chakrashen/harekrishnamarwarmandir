'use client';

import useScrollReveal from '../_hooks/useScrollReveal';

export default function SectionReveal({ children, className = '', delay = 0, as: Tag = 'section', immediate = false }) {
  const { ref, revealed } = useScrollReveal({ immediate });

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
