import { useAddressData, useSaveAddress } from "./useAddressData";

export const useUserData = ({ enabled = true } = {}) =>
  useAddressData({ enabled });

export const useSaveUserAddress = () => useSaveAddress();

export default useUserData;
