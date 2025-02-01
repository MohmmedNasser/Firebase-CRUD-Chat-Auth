export const useSidebar = () => {
  // const windowWidth = useState('windowWidth', () => window.innerWidth);
  const windowWidth = useState('windowWidth', () => process.client ? window.innerWidth : 0);
  const isMobile = useState('isMobile', () => false);
  const isSidebarOpen = useState('isSidebarOpen', () => false);

  const pageSize = () => {
    if (windowWidth.value <= 960) {
      isMobile.value = true
    } else {
      isMobile.value = false
    }
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth;
    pageSize();
    window.addEventListener('resize', pageSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', pageSize);
  });

  return {
    isMobile,
    isSidebarOpen,
    pageSize
  }
}
