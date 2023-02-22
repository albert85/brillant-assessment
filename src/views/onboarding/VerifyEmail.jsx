import React, { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../helper/apiCall';
import { toast } from 'react-toastify';
import { VERIFYUSER } from '../../helper/queryUrl';

const VerifyEmail = () => {
  const params = useLocation()?.search?.split('=')[1];

  const [isSuccess, setSuccess] = React.useState(true);

  const verifyEmailMutate = useMutation(postRequest, {
    onSuccess(res) {
      toast.success(res.message);
      setSuccess(true);
    },
  });

  useEffect(() => {
    handleVerifyEmail()
  }, []);

  const handleVerifyEmail = async (values) => {
    await verifyEmailMutate.mutateAsync({
      url: `${VERIFYUSER}/${params}`,
      data: { verifyField: 'isEmailVerified' },
    });
  };

  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="shadow-lg p-4 h-96 w-96 flex items-center justify-center">
          {verifyEmailMutate.isLoading && (
            <div>
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
          {!verifyEmailMutate.isLoading && isSuccess && (
            <div>
              <Result
                status="success"
                title="Email was successfully verified"
                extra={[
                  <a href="/" key="console">
                    Login
                  </a>,
                ]}
              />
            </div>
          )}

          {!verifyEmailMutate.isLoading && !isSuccess && <div>
            <Result
                status="error"
                title="Email was not successfully verified!"
                extra={[
                  <a href="/" className=" text-blue-500" key="console">
                    Login
                  </a>,
                ]}
              />
            </div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
