When encountering the warning: Warning: Text content did not match.

This is probably because the array/object is being manipulated outside of useEffect

Since Next pre-renders the page when the data is manipulated the data changes and it doesn't match up to the server. This most likely happens with randomization.

To fix this move the shuffling or code that manipulates the array/object in useEffect telling nextjs that we want
to do this client side and not server side.

Another solution is to use next/dynamic to render the data client side.