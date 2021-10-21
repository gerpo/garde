import { ref, Ref } from 'vue';
import { Appointment } from '../../models/Appointment';
import { IModel } from '../../models/IModel';
import { AppointmentDataService } from './AppointmentDataService';
import { DataService } from './DataService';


type dataServiceMethods<T extends DataService<IModel>> = Exclude<keyof T, 'PATH'>

const useDataService = <T extends DataService<IModel>>(service: T, method: dataServiceMethods<T>) => {

    const data: Ref<any> = ref(null);
    const loading = ref(false);
    const error: Ref<any> = ref(null);

    const getData = async (params?: { id?: any, data?: any }) => {
        loading.value = true;
        data.value = null;
        error.value = null;
        await service[method](params)
            .then(response => data.value = response.data.data)
            .catch(err => error.value = err.message)
            .finally(() => loading.value = false)
    };

    return {
        data, loading, error, getData,
    };
};

export const useAppointmentService = (method: dataServiceMethods<AppointmentDataService>) => {
    return useDataService<AppointmentDataService>(new AppointmentDataService(), method)
}