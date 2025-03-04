import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Head from "../component/Heads";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

import styles from "./Login.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/firebseAuth";
import { useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Flex } from "antd";
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../api/firebseApi";
import { isLogin } from "../recoil/auth";
import { useRecoilState } from "recoil";

function Profile() {
  const navigate = useNavigate();

  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
        setUid(user.uid);
        setEmail(user.email);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  });

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <Head isLoggedIn={true} />
      <Container className={`${styles.container} pt-5`}>
        <div style={{ textAlign: "center" }}>
          <h4>로그인 아이디: {email ? email : ""}</h4>
          <Button type="primary" variant="solid" onClick={logout}>
            로그아웃
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
