export default class ListTask {
    addTaskApi(data) {
        return axios({
            url: "https://60cadd6421337e0017e4334d.mockapi.io/api/Task",
            method: "POST",
            data,
        });
    };
    getListTaskApi() {
        return axios({
            url: "https://60cadd6421337e0017e4334d.mockapi.io/api/Task",
            method: "GET",
        });
    };
    deleteTaskApi(id) {
        return axios({
            url: `https://60cadd6421337e0017e4334d.mockapi.io/api/Task/${id}`,
            method: "DELETE",
        });
    };
    getTaskById(id) {
        return axios({
            url: `https://60cadd6421337e0017e4334d.mockapi.io/api/Task/${id}`,
            method: "GET",
        });
    };
    updateTaskById(data) {
        return axios({
            url: `https://60cadd6421337e0017e4334d.mockapi.io/api/Task/${data.id}`,
            method: "PUT",
            data,

        });
    };

}