import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 260px;
  margin-right: 16px;
`;

export const Thumbnail = styled.ImageBackground`
  width: 260px;
  height: 145px;
  overflow: hidden;

  justify-content: flex-end;
  border-radius: 10px;
`;

export const ViewersCountContainer = styled.View`
  flex: 1;
  padding: 12px;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ViewersCount = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const Info = styled.View`
  margin-top: 16px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Avatar = styled.Image`
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const InfoText = styled.View`
  flex: 1;
  height: 40px;

  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const Streamer = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.gray};
`;