import * as React from "react";
import FormPage from "../../components/FormPage";
import {FormEvent, useState} from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.get('/user').catch(function (error) {
            console.log(error);
        });

        axios.post('/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/user')

    }

    return (
        <>
            <FormPage title={"Login"}>
                <form className="space-y-6" onSubmit={(e: FormEvent<HTMLFormElement>) => {onsubmit(e)}}>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email"
                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                               placeholder="name@company.com"
                               required
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your
                            password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                               required
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit"
                            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>

                </form>
            </FormPage>
        </>
    )
}

export default Login;
