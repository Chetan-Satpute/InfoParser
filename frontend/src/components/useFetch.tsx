import React, { useEffect, useState } from 'react';

const useLoading = (func: () => Promise<void>) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
    }

    request();
  }, []);
  
}

export default useLoading;
