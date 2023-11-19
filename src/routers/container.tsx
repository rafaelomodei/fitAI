import { NavBar } from '../components/organisms/NavBar';

interface IContainer {
  children: React.ReactNode;
}
export const Container = (props: IContainer) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
