/*
 * Generated by orval v3.0.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  MutationConfig,
  QueryConfig,
  useMutation,
  useQuery,
} from 'react-query';
import { ListPetsParams, Pet, Pets } from '../model';

export const useListPets = (
  params?: ListPetsParams,
  version = 1,
  queryConfig?: QueryConfig<AxiosResponse<Pets>, AxiosError>,
) => {
  type Mutator = (url: string, config?: object) => [string, object | undefined];

  const mutator: Mutator = (url, config) => [
    url,
    { ...config, responseType: 'json' },
  ];

  return useQuery<AxiosResponse<Pets>, AxiosError>(
    mutator(`/v${version}/pets`, {
      params,
    }),
    (path: string, options: Partial<AxiosRequestConfig>) =>
      axios.get<Pets>(path, options),
    { enabled: version, ...queryConfig },
  );
};
export const useCreatePets = (
  version = 1,
  mutationConfig?: MutationConfig<AxiosResponse<unknown>, AxiosError>,
) => {
  return useMutation<AxiosResponse<unknown>, AxiosError>(
    () => axios.post<unknown>(`/v${version}/pets`),
    mutationConfig,
  );
};
export const useShowPetById = (
  petId: string,
  testId: string,
  version = 1,
  queryConfig?: QueryConfig<AxiosResponse<Pet>, AxiosError>,
) => {
  return useQuery<AxiosResponse<Pet>, AxiosError>(
    [`/v${version}/pets/${petId}/test/${testId}`],
    (path: string, options: Partial<AxiosRequestConfig>) =>
      axios.get<Pet>(path, options),
    { enabled: version && petId && testId, ...queryConfig },
  );
};
