let requester = (function() {
  
  function request(url, type, body, headers) {
    const promise = new Promise((resolve, reject) => $.ajax({
      url,
      type,
      contentType: 'application/json',
      headers,
      data: body,
      success: resolve,
      error: reject
    }));

    return promise;
  }

  function get(url, headers = {}) {
    return request(url, 'GET', '', headers);
  }

  function post(url, body, headers = {}) {
    return request(url, 'POST', JSON.stringify(body), headers);
  }

  function put(url, body, headers = {}) {
    return request(url, 'PUT', JSON.stringify(body), headers);
  }

  return {
        get,
        post,
        put
    };

})();

export { requester };