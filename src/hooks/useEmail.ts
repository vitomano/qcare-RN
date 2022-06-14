
export const useEmail = (email:string) => {

    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(email)) {
        return {
            ok: false,
            msg:'Invalid Email'
        }
    }

    if (email.length === 0) { 
        return {
            ok: false,
            msg:'Empty Email'
        }
    } else {
        return {
            ok: true,
            msg:'OK'
        }
    }

};