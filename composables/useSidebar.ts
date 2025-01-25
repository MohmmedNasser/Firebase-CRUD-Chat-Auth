export const useSidebar = () => {
  const windowWidth = useState('windowWidth', () => window.innerWidth);
  const isMobile = useState('isMobile', () => false);
  const isSidebarOpen = useState('isSidebarOpen', () => false);

  const pageSize = () => {
    if (windowWidth.value <= 960) {
      isMobile.value = true
    } else {
      isMobile.value = false
    }
  }

  return {
    isMobile,
    isSidebarOpen,
    pageSize
  }
}
