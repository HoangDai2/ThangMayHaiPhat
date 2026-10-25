import React from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  nestedIcon?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon: Icon,
  iconPosition = 'right',
  nestedIcon = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'group inline-flex items-center justify-center font-semibold transition-all duration-300 select-none active:scale-[0.98] focus-visible:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-xl gap-2',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2.5',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-3',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#285c9a] hover:bg-[#1e4a80] text-white shadow-md shadow-[#285c9a]/20 hover:shadow-lg hover:shadow-[#285c9a]/30 border border-[#285c9a]',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
    outline:
      'bg-transparent hover:bg-blue-50/60 text-[#285c9a] border border-[#285c9a]',
    white:
      'bg-white hover:bg-slate-100 text-[#0d1f35] shadow-lg shadow-black/10 border border-white',
  }[variant];

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        nestedIcon ? (
          <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center -mr-1 group-hover:translate-x-0.5 transition-transform">
            <Icon size={12} />
          </span>
        ) : (
          <Icon
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            className="group-hover:translate-x-0.5 transition-transform shrink-0"
          />
        )
      )}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={combinedClasses} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
