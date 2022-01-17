import baseFetch from "../../../common/services/liferay/api";
import { Liferay } from "../../../common/services/liferay/liferay";

const API = `o/headless-delivery/v1.0`;

export const getKnowledgeBases = () =>
  baseFetch(
    `${API}/sites/${Liferay.ThemeDisplay.getSiteGroupId()}/knowledge-base-articles`
  );

export const createKnowledgeBase = (form) =>
  baseFetch(
    `${API}/sites/${Liferay.ThemeDisplay.getSiteGroupId()}/knowledge-base-articles`,
    { body: JSON.stringify(form), method: "POST" }
  );

export const deleteKnowledgeBase = (id) =>
  baseFetch(`${API}/knowledge-base-articles/${id}`, { method: "DELETE" });

export const updateKnowledgeBase = (id, form) =>
  baseFetch(`${API}/knowledge-base-articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(form),
  });
