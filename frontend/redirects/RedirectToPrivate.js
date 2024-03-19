const RedirectPrivatePages = ({ decodedToken, req }) => {
    // console.log(decodedToken, req?.cookies?.auth_token);
    if (!req?.cookies?.learn) {
      return {
        redirect : {
            permanent : false,
            destination : "/login"
        }
     }
    }
    
    return null;
  };
  
  export default RedirectPrivatePages;

 