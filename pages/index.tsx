import styles from "@components/index.module.scss";

import * as React from "react";
import * as Requests from "@common/requests";
import * as Strings from "@common/strings";
import * as Utilities from "@common/utilities";
import * as NodeAuth from "@data/node-authentication";
import * as NodeGoogle from "@data/node-google";

import SceneHome from "@scenes/SceneHome";
import App from "@components/App";

declare const window: any;

function IndexPage(props) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const load = async () => {

      setState({
        ...state,
      });
    };

    load();
  }, []);

  return (
    <App
      title="www-react-postgres 0.1"
      description="This is a website template for an example website"
      url=""
    >
      <SceneHome
        viewer={props.viewer}
        googleURL={props.googleURL}
        state={state}
        host={props.host}
      />
    </App>
  );
}

export async function getServerSideProps(context) {
  const { viewer } = await NodeAuth.getViewer(context.req);
  const { googleURL } = await NodeGoogle.generateURL();

  return {
    props: {
      viewer: viewer,
      host: context.req.headers.host,
      googleURL,
    },
  };
}

export default IndexPage;
