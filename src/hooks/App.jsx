import Navbar from '../components/nav';



const AppLayout = (Component) => () => {
  return (
    <div className="relative h-full">
      <div className="hidden md:block md:relative md:top-0">
      <Navbar />
      </div>
      <div className="mt-3 p-4">
        <Component />
      </div>
      <div className="absolute bottom-0 md:hidden">
      <Navbar />
      </div>
    </div>
  )
}

export default AppLayout;