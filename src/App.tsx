import { useMutation } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Form, Input, ImageUploader } from 'antd-mobile';
import classNames from 'classnames';
import { useEffect } from 'react';
import { UPDATE } from './graphql/demo';
import { useUploadOSS } from './hooks/useUploadOSS';
import styles from './App.module.less';

const App = () => {
  const [update] = useMutation(UPDATE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadHandler = useUploadOSS();

  useEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
  }, []);

  const onClickHandler = (v: any) => {
    update({
      variables: {
        id: 'ab42a458-700f-45e5-aa7e-f458ce1043c5',
        params: {
          ...v,
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <Form
        className={classNames(styles.form, styles.formPadding)}
        layout="horizontal"
        onFinish={onClickHandler}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input />
        </Form.Item>
        <Form.Item name="actor" label="头像">
          <ImageUploader upload={uploadHandler} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
