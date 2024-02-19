import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

const FinancereportPage = () => {
  return (
    <div className='flex items-center w-full max-w-screen-xl mx-auto px-6 py-10'>
      <div className='max-w-2xl w-full mx-auto flex flex-col gap-10'>
        <Card radius='sm'>
          <CardHeader>
            <p>PT. Kembang Christapharma & Group</p>
          </CardHeader>
          <Divider />
          <CardBody className='p-5'></CardBody>
          <Divider />
        </Card>
      </div>
    </div>
  );
};

export default FinancereportPage;
