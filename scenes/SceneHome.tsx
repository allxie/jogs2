import * as React from "react";
import * as Actions from "@common/actions";
import * as Strings from "@common/strings";

import styles from "@scenes/SceneHome.module.scss";

import Header from "@components/Header";
import Layout from "@components/Layout";
import LayoutLeft from "@components/LayoutLeft";
import LayoutRight from "@components/LayoutRight";
import LineItem from "@components/LineItem";
import StatePreview from "@components/StatePreview";
import Content from "@components/Content";
import Input from "@components/Input";
import Button from "@components/Button";
import Tip from "@components/Tip";

import H1 from "@components/H1";
import H2 from "@components/H2";
import P from "@components/P";

declare const window: any;

const handleChange = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value });
};

function SceneHome(props) {
  const [state, setState] = React.useState({ email: "", password: "" , title: "" });

  let maybeRenderGoogleAuth =
    !props.viewer && !Strings.isEmpty(props.googleURL);
  if (
    props.viewer &&
    !Strings.isEmpty(props.googleURL) &&
    props.viewer.data &&
    !props.viewer.data.google
  ) {
    maybeRenderGoogleAuth = true;
  }

  return (
    <section className={styles.scene}>
      <Header>
        <Content>
          <H1>www-react-postgres 0.1</H1>
        </Content>
      </Header>
      <Layout>
        <LayoutLeft>
          {
            <LineItem>
              <Content>
                <H2>Create Story</H2>
                <Input
                  autoComplete="off"
                  value={state.title}
                  placeholder="As a user..."
                  name="title"
                  onChange={(e) => handleChange(e, state, setState)}
                />
                <Button onClick={() => Actions.execute("CREATE_STORY", state)}>
                  Create
                </Button>
              </Content>
            </LineItem>
          }
          {props.viewer && (
            <React.Fragment>
              <LineItem>
                <Content>
                  <H2>Sign out</H2>

                  <P>
                    This method will delete string that holds the JWT in the
                    cookie. To authenticate again you will need to sign in.
                  </P>

                  <Button
                    onClick={() => Actions.execute("SIGN_OUT")}
                    style={{ background: `var(--color-warning)` }}
                  >
                    Sign out
                  </Button>
                </Content>
              </LineItem>
              <LineItem>
                <Content>
                  <H2>Delete Account</H2>

                  <P>
                    This method will delete the user entry from the user table.
                    If the user is part of an organization this will delete the
                    user from the organization but will not delete the
                    organization row even if it has no members.
                  </P>

                  <Button
                    onClick={() => Actions.execute("VIEWER_DELETE_USER")}
                    style={{ background: `var(--color-failure)` }}
                  >
                    Delete {props.viewer.id}
                  </Button>
                </Content>
              </LineItem>
            </React.Fragment>
          )}
          {!props.viewer && (
            <LineItem>
              <Content>
                <H2>Sign in</H2>
                <P>
                  This is a traditional username and password sign in, if an
                  account exists it will check if the credentials are correct,
                  if the account does not exist a new user entry will be added
                  in your Postgres database. You will need to figure out a way
                  to verify the e-mail address on your own.
                </P>

                <Input
                  autoComplete="off"
                  value={state.email}
                  placeholder="someone@something.com"
                  name="email"
                  onChange={(e) => handleChange(e, state, setState)}
                />
                <Input
                  style={{ marginTop: 12, marginBottom: 24 }}
                  autoComplete="off"
                  value={state.password}
                  name="password"
                  placeholder="Enter a password"
                  type="password"
                  onChange={(e) => handleChange(e, state, setState)}
                />
                <Button onClick={() => Actions.execute("SIGN_IN", state)}>
                  Continue
                </Button>
              </Content>
            </LineItem>
          )}
          {maybeRenderGoogleAuth && (
            <LineItem>
              <Content>
                {props.viewer ? (
                  <H2>Continue with Google</H2>
                ) : (
                  <H2>Sign in with Google</H2>
                )}

                <P>
                  This is a traditional Google sign in flow. The necessary
                  client ID and client secret are provided by Google. Unlike the
                  local authentication strategy with a username and password, a
                  user using this method will have a verified e-mail.
                </P>

                {props.viewer && (
                  <P>
                    If a user continues with a Google account that does not
                    match the local authentication e-mail, it will sign that
                    user into that account instead.
                  </P>
                )}

                <Button href={props.googleURL}>Continue to Google</Button>
              </Content>
            </LineItem>
          )}
        </LayoutLeft>
        <LayoutRight>

          {props.viewer && props.viewer.data.verified && (
            <Tip>{props.viewer.email} is verified.</Tip>
          )}

          {props.viewer && props.viewer.data.google && (
            <Tip style={{ background: `var(--color-primary)` }}>
              {props.viewer.email} has connected Google to their account.
            </Tip>
          )}

          {props.viewer && !props.viewer.data.verified && (
            <Tip style={{ background: `var(--color-warning)` }}>
              {props.viewer.email} is not verified.
            </Tip>
          )}
          <StatePreview state={props} />
        </LayoutRight>
      </Layout>
    </section>
  );
}

export default SceneHome;
