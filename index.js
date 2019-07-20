require("dotenv").config();
const Axios = require("axios");
const axios = Axios.create({
  baseURL: "https://vinaymavi-91108825-eval-test.apigee.net/"
});
const APIKEY = process.env.APIKEY;
exports.handler = async event => {
  let resp;
  let data;
  switch (event.action) {
    case "RC_CREATE_GITHUB":
      data = {
        access_token: event.access_token,
        repo_name: event.repo_name
      };
      resp = await axios.post(`/repo-creation-github/?apikey${APIKEY}`, data);
      break;
    case "RU_COMMIT_GITHUB":
      data = {
        source_access_token: event.source_access_token,
        destination_access_token: event.destination_access_token,
        source_repo_url: event.source_repo_url,
        destination_repo_url: event.destination_repo_url
      };
      resp = await axios.post(`/repo-first-commit/?apikey${APIKEY}`, data);
      break;
    case "RC_CREATE_CIRCLECI":
      data = {
        access_token: event.access_token,
        project_name: event.project_name,
        vcs_type: event.vcs_type,
        user_name: event.user_name
      };
      resp = await axios.post(
        `/pipeline-circle-ci-follow/?apikey${APIKEY}`,
        data
      );
      break;
    case "RU_ENVVAR_CIRCLECI":
      data = {
        access_token: event.access_token,
        project_name: event.project_name,
        vcs_type: event.vcs_type,
        user_name: event.user_name,
        variables: event.variables
      };
      resp = await axios.post(
        `/pipeline-circleci-variables/?apikey${APIKEY}`,
        data
      );
      break;
    default:
      resp = {
        status: 400,
        desc: "action not supported"
      };
  }
  return resp;
};
