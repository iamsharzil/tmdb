import { TReactChildren } from '@interfaces/index';

import { Header } from './Header';

export const Layout: ({ children }: TReactChildren) => JSX.Element = ({
  children,
}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
