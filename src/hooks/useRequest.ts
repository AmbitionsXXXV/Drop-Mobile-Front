import { useCallback, useState } from 'react';
import useMount from './useMount';

interface IOptions {
  params: Record<string, string>;
  manual: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: unknown) => void;
}

/**
 * 1.组件初始化发送请求
 * @param service
 * @param params
 * @returns
 */
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
  params: Record<string, string>,
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(
    (params: Record<string, string>) => {
      setLoading(true);
      return service(params)
        .then(res => {
          setData(res);
          setLoading(false);
          options.onSuccess && options.onSuccess(res);
        })
        .catch(err => {
          setLoading(false);
          options.onError && options.onError(err);
        });
    },
    [service],
  );

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => init(runParams);

  return { data, loading, run };
};

export default useRequest;
