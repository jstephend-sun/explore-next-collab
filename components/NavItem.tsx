import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
  href: string;
};

export const NavItem = ({ children, href }: Props) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Link href={href}>
      <a className={`btn ${path == href && 'btn-info'} btn-sm`}>{children}</a>
    </Link>
  );
};

export default NavItem;
