/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useAlert } from 'react-alert';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import {
  H2, P,
} from './Basic/Text';
import { Container, RowWrapper, ColWrapper } from './Basic/Wrapper';
import { SecondaryBtn } from './Basic/Button/Button';
import CodeView from './Basic/Code';
import { device } from '../style';

export const Title = styled(H2)`
    color: ${(props) => props.theme.primary};
    font-family: "Rajdhani";
    
    @media ${device.xs_sm}{
        font-size: 1.8rem;
        text-align: center;
    }
`;

export const Description = styled(P)`
    color: ${(props) => props.theme.text2};
    font-family: "Rajdhani";
    
    @media ${device.xs_sm}{
        font-size: .8rem;
        text-align: center;
    }
`;


export const Keywords = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-family: "Rajdhani";
    padding: 0px 10px; 

    @media ${device.xs_sm}{
        justify-content: center;
    }

    a{
        border-radius: 5px;
        text-align: center;
        padding: 0px 12px;
        font-size: 1rem;
        background-color: ${(props) => props.theme.secondary};
        color: ${(props) => props.theme.tertiary};
        margin: 2px;

        @media ${device.xs_sm}{
            font-size: .8rem;
            text-align: center;
        }
        
        @media ${device.web}{          
          &:hover, span{      
              background-color: ${(props) => props.theme.primary};
              text-decoration: none;
              cursor: pointer;
        }
    }
`;

export const Table = styled.table`
    word-break: break-all;
    flex: 1;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text1};
    width: 100%;
    font-family: "Rajdhani";
    text-transform: uppercase;

    td{
        user-select: none;
        padding: 4px 10px;
        width: 50%;

        &:first-child{
            text-align: right;
            border-right: 5px solid;
            border-color: ${(props) => props.theme.primary};
        }
    }
`;


export const TR = styled.tr`
    color: ${(props) => (props.alert ? props.theme.error : props.theme.text1)};
`;


export const APITable = styled.table`
    word-break: break-all;
    flex: 1;
    background-color: ${(props) => props.theme.bg};
    width: 100%;
    font-family: "Rajdhani";
    font-size: 1rem;

    td,th{
        padding: 5px 8px;
        border: 1px solid;
        border-color: #F20574;
        background-color: ${(props) => props.theme.tertiary};
        white-space: nowrap;
        text-align: center;
        border-color: ${(props) => props.theme.secondary};
        color: ${(props) => props.theme.paper};

        &:first-child{
            text-align: right;
            border-right: 5px solid;
            border-color: ${(props) => props.theme.secondary};
            color: ${(props) => props.theme.text2};
            width: 200px;
        }
        &:last-child{
          text-align: left;
          border-left: 5px solid;
          border-color: ${(props) => props.theme.secondary};
          color: ${(props) => props.theme.text2};
          width: 200px;
      }

      p{
        cursor: pointer;
        margin: auto;
        width: fit-content;
      }

    }
    
      
    td{
      color: ${(props) => props.theme.secondary};
      font-size: .85rem;
    }
    th{
      border-color: ${(props) => props.theme.secondary};
      color: ${(props) => props.theme.text1};
      user-select: none;
      border-bottom: 5px solid;
    }
`;

export const TokenView = styled.div`
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    font-family: "Rajdhani";
    width: auto;
    margin-bottom: 28px;
    padding: 5px 10px;
    background-color: transparent;
    color:  ${(props) => props.theme.secondary};
    background-color: ${(props) => props.theme.tertiary};
    border: 5px solid;
    border-color: ${(props) => props.theme.primary};
    box-shadow: ${(props) => props.theme.shadow};

    span{
        padding: 0px 5px;    

        &:first-child{    
            user-select: none;
        }
        
        &:last-child{
            color:  ${(props) => props.theme.primary};
        }
    }

    @media ${device.xs_sm}{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2px;
        word-break: break-all;
    }
`;


export default function View({ payload, onlyPublic }) {
  const alert = useAlert();
  const isPublic = onlyPublic ? payload.visibility === 'public' : true;

  return (
    <Container padding="0px" column>
      <RowWrapper>
        <ColWrapper padding="28px 0px" className="col-md-6">
          <Title>{payload.title}</Title>
          <Description>{payload.description}</Description>
          <Keywords>
            {payload.keywords.map((keyword, index) => (
              <Link key={index} href={{ pathname: '/explore', query: { keyword } }}>
                {keyword}
              </Link>
            ))}
          </Keywords>
        </ColWrapper>

        <ColWrapper padding="28px 0px" className="col-md-4">
          <Table>
            <tbody>
              <TR alert={payload.visibility === 'private'}>
                <td>Visibility</td>
                <td>{payload.visibility}</td>
              </TR>
              <TR>
                <td>Type</td>
                <td>{payload.type}</td>
              </TR>
              <TR alert={payload.status !== 'active'}>
                <td>Status</td>
                <td>{payload.status}</td>
              </TR>
              <TR>
                <td>Creator</td>
                <td>{payload.owner.displayName !== '' ? payload.owner.displayName : 'Nameless'}</td>
              </TR>
              <TR>
                <td>View Count</td>
                <td>{payload.viewCount}</td>
              </TR>
              <TR>
                <td>API Hit Count</td>
                <td>{payload.hitCount}</td>
              </TR>
              <TR alert={payload.parentId}>
                <td>Cloned</td>
                <td>{payload.parentId ? 'Yes' : 'No'}</td>
              </TR>
            </tbody>
          </Table>
        </ColWrapper>
      </RowWrapper>
      <Link href={`/cloan/${payload.url}`}>
        <SecondaryBtn margin="0px 0px 28px">Cloan</SecondaryBtn>
      </Link>
      {!onlyPublic && (
      <CopyToClipboard text={payload.hash} onCopy={() => alert.info('Copied to Clipboard')}>
        <TokenView>
          <span>Token</span>
          <span>{payload.hash}</span>
        </TokenView>
      </CopyToClipboard>
      )}
      <RowWrapper>
        <ColWrapper shadow overflow="auto" margin="0px 10px" className="col-md-10">
          <APITable>
            <thead>
              <tr>
                <th>METHOD</th>
                <th>URL</th>
                <th>NOTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>
                  <CopyToClipboard text={`${process.env.PAYLOAD_URL}${payload.url}`} onCopy={() => alert.info('Copied to Clipboard')}>
                    <p>
                      {process.env.PAYLOAD_URL}
                      {payload.url}
                    </p>
                  </CopyToClipboard>
                </td>
                <td>Fetch Complete Object</td>
              </tr>
              {payload.type === 'dynamic'
              && (
              <>
                <tr>
                  <td>GET</td>
                  <td>
                    <CopyToClipboard text={`${process.env.PAYLOAD_URL}${payload.url}/:id`} onCopy={() => alert.info('Copied to Clipboard')}>
                      <p>
                        {process.env.PAYLOAD_URL}
                        {payload.url}
                        /:id
                      </p>
                    </CopyToClipboard>
                  </td>
                  <td>Fetch Object by ID</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>
                    <CopyToClipboard text={`${process.env.PAYLOAD_URL}${payload.url}`} onCopy={() => alert.info('Copied to Clipboard')}>
                      <p>
                        {process.env.PAYLOAD_URL}
                        {payload.url}
                      </p>
                    </CopyToClipboard>
                  </td>
                  <td>Add New Object</td>
                </tr>
                <tr>
                  <td>PUT</td>
                  <td>
                    <CopyToClipboard text={`${process.env.PAYLOAD_URL}${payload.url}/:id`} onCopy={() => alert.info('Copied to Clipboard')}>
                      <p>
                        {process.env.PAYLOAD_URL}
                        {payload.url}
                        /:id
                      </p>
                    </CopyToClipboard>
                  </td>
                  <td>Update Object by ID</td>
                </tr>
                <tr>
                  <td>DELETE</td>
                  <td>
                    <CopyToClipboard text={`${process.env.PAYLOAD_URL}${payload.url}/:id`} onCopy={() => alert.info('Copied to Clipboard')}>
                      <p>
                        {process.env.PAYLOAD_URL}
                        {payload.url}
                        /:id
                      </p>
                    </CopyToClipboard>
                  </td>
                  <td>Delete Object by ID</td>
                </tr>
              </>
              )}
            </tbody>
          </APITable>
        </ColWrapper>
      </RowWrapper>
      {isPublic && <CodeView code={payload.data} />}
    </Container>
  );
}
