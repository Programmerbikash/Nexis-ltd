import { useEffect, useState } from "react";


const useToken = (email) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        if (email) {
            fetch(`https://test.nexisltd.com/login?email=${email}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
                setToken(data.accessToken);
            // console.log(data)
        })
        }
    }, [email])
    return [token];
};

export default useToken;