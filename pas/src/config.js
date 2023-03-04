const url = 'http://192.168.1.175:8080';

const path = {
	path_list_doc() { return `${url}/list-doc` },
	path_add_doc() { return `${url}/add-doc` },
	path_view_doc() { return `${url}/view-doc` },
	path_edit_point() { return `${url}/edit-point` },
	path_add_file() { return `${url}/add-file` },
	path_list_files() { return `${url}/list-files` },
	path_get_files() { return `${url}/get-files` },
}
export default path