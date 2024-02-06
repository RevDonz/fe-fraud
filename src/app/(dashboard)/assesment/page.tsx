import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Link,
} from '@nextui-org/react';
import ModalAssesment from '../home/modal';

export const Questions = [
  {
    title: 'Risk Fraud Assesment',
    questions:
      'Seberapa sering anda melakukan assesment penilaian kemungkinan penipuan?',
  },
  {
    title: 'Competent Internal Accountant',
    questions: 'Apakah ada akuntan internal yang kompeten?',
  },
  {
    title: 'Continous Improvement of SOP',
    questions: 'Apakah anda sering meningkatkan kualitas dari SOP?',
  },
  {
    title: 'Continous Improvement of Internal Control',
    questions:
      'Apakah anda sering meningkatkan kualitas dari pengendalian lingkup internal?',
  },
  {
    title: 'Build Good Governance',
    questions: 'Apakah anda sering memperbaiki tata kelola yang baik?',
  },
  {
    title: 'Build a culture of integrity',
    questions: 'Apakah anda sering memperbaiki budaya integritas instansi?',
  },
  {
    title: 'Operant Conditioning',
    questions:
      'Apakah ada kebijakan tentang perilaku yang diulang, dalam bentuk yang positif ataupun negatif?',
  },
  {
    title: 'Modelling',
    questions:
      'Apakah ada kebijakan internal yang diterapkan oleh entitas untuk mengkondisikan setiap individu entitas belajar melalui mengamati dan mencontohkan perilaku baik orang lain di sekitar mereka?',
  },
  {
    title: 'Communication of Fraud Indication',
    questions:
      'Apakah ada media komunikasi bagi karyawan untuk pemberitahuan indikasi penipuan?',
  },
  {
    title: 'Consequence of Fraud',
    questions:
      'Apakah terdapat kebijakan mengenai penegakan hukuman proporsional dengan melihat jenis pelanggarannya, apakah ringan, sedang, atau serius?',
  },
];
const AssesmentPage = () => {

  return (
    <div className='flex items-center w-full max-w-screen-xl mx-auto px-6 py-10'>
      <ModalAssesment />
      <div className='max-w-2xl w-full mx-auto flex flex-col gap-10'>
        {Questions.map((questions, index) => {
          return (
            <Card radius='sm' key={questions.title}>
              <CardHeader>
                <p className='font-semibold'>{`${index + 1} ${
                  questions.title
                }`}</p>
              </CardHeader>
              <Divider />
              <CardBody className='py-5'>
                <p className='mb-3'>
                  Seberapa sering anda melakukan assesment penilaian kemungkinan
                  penipuan?
                </p>
                <CheckboxGroup orientation='horizontal'>
                  <Checkbox value='ada-lengkap'>
                    Ada, dan sudah lengkap
                  </Checkbox>
                  <Checkbox value='ada-belum-lengkap'>
                    Ada, belum lengkap
                  </Checkbox>
                  <Checkbox value='belum-ada'>Belum ada</Checkbox>
                </CheckboxGroup>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className='flex flex-col gap-3'>
                  <p>Upload bukti</p>
                  <Input size='sm' type='file' />
                </div>
              </CardFooter>
            </Card>
          );
        })}
        <div className='flex justify-end items-center'>
          <Button
            href='/assesment/result'
            as={Link}
            color='primary'
            variant='solid'
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssesmentPage;
