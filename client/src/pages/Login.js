import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Head from "../component/Heads";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

import styles from "./Login.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/firebseAuth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../api/firebseApi";
import { useRecoilState } from "recoil";
import { isLogin, loginId } from "../recoil/auth";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/profile");
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const googleLogin = () => {
    handleGoogleLogin();
  };

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then(async (data) => {
        if (data.user) {
          // 중복 가입 방지
          const q = query(
            collection(db, "users"),
            where("email", "==", data.user.email)
          );

          const result = await getCountFromServer(q);
          const count = result.data().count;

          if (count == 0) {
            const userRef = await addDoc(collection(db, "users"), {
              uid: data.user.uid,
              email: data.user.email,
              regDate: Date.now(),
            });
          }
          navigate("/");
          // 로그인 처리
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Head isLoggedIn={true} />
      <Container className={`${styles.container} pt-5`}>
        <div style={{ textAlign: "center" }}>
          <h4>로그인</h4>
          <div>구글 계정으로 로그인하실 수 있습니다.</div>
          <div className={styles.googleAuth} onClick={googleLogin}>
            <img src="/img/icon/google.png" className={styles.googleImg} />
            구글 계정으로 로그인
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
