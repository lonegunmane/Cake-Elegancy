import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

interface RouterContextType {
  pathname: string;
  navigate: (href: string) => void;
  isPending: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href: string) => {
    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    startTransition(() => {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', href);
        setPathname(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate, isPending }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return {
    push: context.navigate,
    pathname: context.pathname,
    isPending: context.isPending,
  };
}

export function usePathname() {
  const context = useContext(RouterContext);
  return context?.pathname || '/';
}

export function Link({
  href,
  children,
  className,
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
