import React, { useEffect, useState } from "react";
import * as Service from "../services/KnowledgeBase";

const defaultForm = {
  articleBody: "",
  title: "",
};

const KnowledgeBase = () => {
  const [form, setForm] = useState(defaultForm);
  const [knowledgeBases, setKnowledgeBases] = useState([]);

  const getKnowledgeBases = async () => {
    const data = await Service.getKnowledgeBases();

    setKnowledgeBases(data.items);
  };

  const onSave = async (event) => {
    event.preventDefault();

    if (form.id) {
      const data = await Service.updateKnowledgeBase(form.id, {
        articleBody: form.articleBody,
        title: form.title,
      });

      return setKnowledgeBases(
        knowledgeBases.map((knowledgeBase) => {
          if (knowledgeBase.id === form.id) {
            return data;
          }

          return knowledgeBase;
        })
      );
    }

    const data = await Service.createKnowledgeBase(form);

    setKnowledgeBases([...knowledgeBases, data]);
  };

  const deleteKnowledgeBase = async (id) => {
    await Service.deleteKnowledgeBase(id);

    setKnowledgeBases(
      knowledgeBases.filter((knowledgeBase) => knowledgeBase.id !== id)
    );
  };

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    getKnowledgeBases();
  }, []);

  return (
    <div className="container hello-world">
      <h1>KnowledgeBase</h1>

      <div className="row mt-5">
        <form className="col" onSubmit={onSave}>
          <h3 className="mb-4">
            {form.id ? "Update" : " Create"} KnowledgeBase
          </h3>

          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              onChange={onChange}
              value={form.title}
            />
          </div>

          <div className="form-group">
            <label>Article Body</label>
            <input
              className="form-control"
              name="articleBody"
              onChange={onChange}
              value={form.articleBody}
            />
          </div>

          <button
            className="btn btn-secondary mr-2"
            type="button"
            onClick={() => setForm(defaultForm)}
          >
            Reset
          </button>

          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>

        <div className="col">
          {knowledgeBases.length ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Article Body</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeBases.map((knowledgeBase, index) => {
                  return (
                    <tr key={index}>
                      <td>{knowledgeBase.id}</td>
                      <td>{knowledgeBase.title}</td>
                      <td>{knowledgeBase.articleBody}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            setForm({
                              id: knowledgeBase.id,
                              title: knowledgeBase.title,
                              articleBody: knowledgeBase.articleBody,
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => deleteKnowledgeBase(knowledgeBase.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
