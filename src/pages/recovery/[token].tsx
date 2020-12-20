import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { PartialNextContext, withUrqlClient } from 'next-urql';
import {useRouter} from "next/router";
import React from 'react';
import { InputField } from '../../components/inputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
// import login from '../login';

const Recovery: NextPage<{token: string }> = ({token}) => {
    const router = useRouter(); //hook to navigate through pages
    const [{}, changePassword] = useChangePasswordMutation();

        return (
            <Wrapper variant='small'>
            <Formik 
                initialValues={{newPassword: "", newPassword2: ""}} 
                onSubmit={
                    async (inputValues, {setErrors}) => {
                        if (inputValues.newPassword !== inputValues.newPassword2) {
                            setErrors({newPassword2: 'Password must match'})
                        } else {
                            const response = await changePassword({newPassword: inputValues.newPassword, token: token});
                            // const response = await login({
                            //     userOrEmail: inputValues.usernameOrEmail, 
                            //     pass: inputValues.password
                            // });

                            if (response.data?.changePassword.errors) {
                                setErrors(
                                    toErrorMap(response.data?.changePassword.errors)
                                );
                            } else if (response.data?.changePassword.user) {
                                //Password changed successfully and user set on cookies
                                //navigate to landing page with logged in user info
                                router.push("/");
                            }
                        }

                        
                    }
                }
            >         
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder=""
                            label="Enter new password"
                            type= "password"
                        />

                        <Box mt={4}>
                            <InputField
                                name="newPassword2"
                                placeholder=""
                                label="Confirm your new password"
                                type="password" //this 'type' prop hides characters from sight during input
                            />
                        </Box>

                        <Button 
                            mt={4} //margin top
                            isLoading={isSubmitting} //loading animation on the button during 'await'
                            type='submit' 
                            colorScheme='teal'>
                                Change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

Recovery.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}
export default  withUrqlClient(createUrqlClient, {ssr: false})<NextPage>(Recovery);