import React from "react";
import CreateSiteContent from "../CreateSiteContent";
import { useState } from "react";
import { useContext } from "react";
import { FormLabel, Form, FormGroup, FormControl } from "react-bootstrap";
import SiteContentItem from "./SiteContentItem";
import { SiteContentContext } from "../../../context/SiteContentContext";

const ManageSiteContent = () => {
  const [showCreateSiteContent, setShowCreateSiteContent] = useState(false);
  const [showEditSiteContent, setShowEditSiteContent] = useState(false);
  return (
    <div className="">
      <p
        onClick={() => setShowCreateSiteContent((s) => !s)}
        className="btn1 mb-1 text-center"
      >
        Manage site content
      </p>

      <div
        className={showCreateSiteContent ? " d-flex flex-column" : "hide_class"}
      >
        <CreateSiteContent />
        <EditSiteContent />
      </div>
    </div>
  );
};

const EditSiteContent = () => {
  const [showEditContent, setShowEditContent] = useState(false);
  const { siteContent } = useContext(SiteContentContext);
  return (
    <div>
      <p
        onClick={() => setShowEditContent((s) => !s)}
        className="btn2 text-center"
      >
        Edit site content
      </p>

      <div className={showEditContent ? "  " : "hide_class"}>
        <SiteContentItem siteContent={siteContent[0]} />
      </div>
    </div>
  );
};

export default ManageSiteContent;
