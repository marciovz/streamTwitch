import { ReactNode } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import { MotiView } from 'moti';


interface SignOutButtonProps extends RectButtonProps {
  children: ReactNode;
}

export const Container = styled(MotiView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 10}px 12px 24px 24px;
  background-color: ${({ theme }) => theme.colors.purple};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  margin-right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 5px;
`;

export const UserInfoText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`;

export const SignOutButton = styled(RectButton)<SignOutButtonProps>`
  padding: 12px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
`;

export const UserFollowedStreams = styled.View`
  margin-top: 32px;
`;

export const UserFollowedStreamsTitle = styled.Text`
  margin-bottom: 24px;
  margin-left: 24px;

  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopGames = styled.View`
  margin-top: 48px;
`;

export const TopGamesTitle = styled.Text`
  margin-bottom: 24px;
  margin-left: 24px;

  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;
