import { Result } from 'antd';

const EmailInfoPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="shadow-lg p-4">
        <Result
          status="success"
          title="Verification link has been sent to your email, please check"
          extra={[
            <a href="/" key="console">
              Login
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default EmailInfoPage;
