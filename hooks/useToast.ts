type ToastType = 'success' | 'error';

export function useToast() {
  const showToast = (type: ToastType, message: string) => {
    // Implement your toast logic here
    console.log(`${type}: ${message}`);
  };

  return { showToast };
} 