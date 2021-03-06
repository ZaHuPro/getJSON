/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Link from 'next/link';
import { PageWithOutContainer } from '../components/Layout/Page';
import {
  HeroImg, HeroTitle, HeroText, HeroButtonGroup, HeroColWrapper, TryYourselfButton,
  HeroRowWrapper, HomeContainer, Text, BoxRow, Methods, MethodTable, MethodButton,
} from '../components/Extended/Home';
import { PrimaryBtn, SecondaryBtn } from '../components/Basic/Button/Button';
import { H3, H5 } from '../components/Basic/Text';
import CodeView from '../components/Basic/Code';

export default function Home() {
  const staticPayload = {
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: '24.6463',
        lng: '-168.8889',
      },
    },
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    company: {
      name: 'Yost and Sons',
      catchPhrase: 'Switchable contextually-based project',
      bs: 'aggregate real-time technologies',
    },
  };

  const dynamicPayload = [{
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  }];

  const reqIs = {
    method: 'GET',
    url: `${process.env.PAYLOAD_URL}:url`,
    header: {
      Authorization: 'Bearer <PAYLOAD_TOKEN_HERE>',
    },
    params: {
      url: 'dynamic_payload',
    },
    body: {},
  };

  const resIs = {
    success: true,
    status: 200,
    message: 'Accepted',
    payload: staticPayload,
  };

  const bodyData = {
    update: {
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    create: {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },

  };

  const [currentCall, setCurrentCall] = useState(1);
  const [reqPayload, setReqPayload] = useState({ ...reqIs, params: { ...reqIs.params, url: 'static_payload' } });
  const [resPayload, setResPayload] = useState(resIs);

  const handleMethod = (_call) => {
    setCurrentCall(_call);
    if (_call === 2) {
      setReqPayload({ ...reqIs });
      setResPayload({ ...resIs, payload: dynamicPayload });
    } else if (_call === 3) {
      setReqPayload({ ...reqIs, params: { ...reqIs.params, id: 3 }, url: `${reqIs.url}/:id` });
      setResPayload({ ...resIs, payload: dynamicPayload.find((p) => p.id === 3) });
    } else if (_call === 4) {
      setReqPayload({
        ...reqIs, body: bodyData.create, method: 'POST',
      });
      setResPayload({ ...resIs, payload: [...dynamicPayload, bodyData.create] });
    } else if (_call === 5) {
      setReqPayload({
        ...reqIs, body: bodyData.update, params: { ...reqIs.params, id: 4 }, method: 'PUT', url: `${reqIs.url}/:id`,
      });
      setResPayload({ ...resIs, payload: [...dynamicPayload.map((p) => (p.id === 4 ? { ...p, ...bodyData.update } : p))] });
    } else if (_call === 6) {
      setReqPayload({
        ...reqIs, method: 'DELETE', params: { ...reqIs.params, id: 2 }, url: `${reqIs.url}/:id`,
      });
      setResPayload({ ...resIs, payload: dynamicPayload.filter((p) => p.id !== 2) });
    } else {
      setCurrentCall(1);
      setReqPayload({ ...reqIs, params: { ...reqIs.params, url: 'static_payload' } });
      setResPayload(resIs);
    }
  };

  return (
    <PageWithOutContainer>
      <HomeContainer>
        <HeroRowWrapper>
          <HeroColWrapper className="col-lg-5">
            <HeroImg src="/images/illustrations/hero.svg" alt="Hero" />
          </HeroColWrapper>
          <HeroColWrapper className="col-lg-6">
            <HeroTitle>What we do ?</HeroTitle>
            <HeroText padding="0px 0px 28px" align="center">
              We provide you the service to create Rest APIs on the go for all practical and impractical purposes.
              We address our APIs as
              {' '}
              <span>Payload</span>
              {' '}
              {' '}
              since you can load it with as much data as you need!
            </HeroText>
            <HeroButtonGroup>
              <Link href="/explore">
                <PrimaryBtn margin="5px">Explore</PrimaryBtn>
              </Link>
              <Link href="/dashboard/payload/create">
                <PrimaryBtn margin="5px">Create</PrimaryBtn>
              </Link>
            </HeroButtonGroup>
          </HeroColWrapper>
        </HeroRowWrapper>

        <BoxRow margin="28px 0px 0px" padding="28px 0px 0px">
          <HeroColWrapper margin="0px 0px 28px" className="col-md-6">
            <H5 font="Rajdhani">Static Payload</H5>
            <CodeView margin="0px" code={staticPayload} />
          </HeroColWrapper>
          <HeroColWrapper margin="0px 0px 28px" className="col-md-6">
            <H5 font="Rajdhani">Dynamic Payload</H5>
            <CodeView margin="0px" code={dynamicPayload} />
          </HeroColWrapper>
        </BoxRow>

        <BoxRow margin="0px 0px 28px">
          <HeroColWrapper className="col-md">
            <H3 font="Rajdhani" align="center" margin="0px 0px 10px">Let&rsquo;s see some practical examples</H3>
            <Text margin="0px" maxWidth="660px">
              We have distinguished our Payload as static payload and dynamic payload.
              See for yourself on how the Static Payload and Dynamic Payload work by clicking on the
              {' '}
              <span>Buttons</span>
              .
            </Text>

          </HeroColWrapper>
        </BoxRow>

        <BoxRow margin="0px 0px 10px">
          <HeroColWrapper className="col-md">
            <MethodTable>
              <tbody>
                <tr>
                  <td>Static</td>
                  <td>
                    <Methods>
                      <MethodButton onClick={() => handleMethod(1)} active={currentCall === 1}>Read</MethodButton>
                    </Methods>
                  </td>
                </tr>

                <tr>
                  <td>Dynamic</td>
                  <td>
                    <Methods>
                      <MethodButton onClick={() => handleMethod(2)} active={currentCall === 2}>Read</MethodButton>
                      <MethodButton onClick={() => handleMethod(3)} active={currentCall === 3}>Read One</MethodButton>
                      <MethodButton onClick={() => handleMethod(4)} active={currentCall === 4}>Create</MethodButton>
                      <MethodButton onClick={() => handleMethod(5)} active={currentCall === 5}>Update</MethodButton>
                      <MethodButton onClick={() => handleMethod(6)} active={currentCall === 6}>Delete</MethodButton>
                    </Methods>
                  </td>
                </tr>
              </tbody>
            </MethodTable>
          </HeroColWrapper>
        </BoxRow>

        <BoxRow padding="28px 0px 0px">
          <HeroColWrapper margin="0px 0px 28px" className="col-md-6">
            <H5 font="Rajdhani">Request</H5>
            <CodeView margin="0px" code={reqPayload} />
          </HeroColWrapper>
          <HeroColWrapper margin="0px 0px 28px" className="col-md-6">
            <H5 font="Rajdhani">Response</H5>
            <CodeView margin="0px" code={resPayload} />
          </HeroColWrapper>
        </BoxRow>

        <TryYourselfButton>
          <Link href="/dashboard/payload/create">
            <SecondaryBtn margin="5px">Try it yourself</SecondaryBtn>
          </Link>
        </TryYourselfButton>
      </HomeContainer>
    </PageWithOutContainer>
  );
}
