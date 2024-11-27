const FetchFileService = async (url: any, method = 'GET', variables: File | null = null, type: any = null) => {
  try {
    const headers: any = {};

    if (type) headers['Content-Type'] = type;

    const data = await fetch(`${url}`, {
      headers,
      method: method,
      body: variables,
    });

    return { ok: true, data };
  } catch (err: any) {
    throw new Error(JSON.stringify(err?.response?.data) || '');
  }
};

export default FetchFileService;
