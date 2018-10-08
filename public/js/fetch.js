export const fetchProjects = async () => {
  const url = "/api/v1/projects";
  const response = await fetch(url);
  const data = await response.json();
  populateProjectMenu(data);
  populateProjectList(data);
}