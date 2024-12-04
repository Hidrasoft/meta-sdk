import { MetaApiClient } from './MetaApiClient';

const metaApiClient = new MetaApiClient({
  useAccessToken: false,
  auth: {
    accessToken: "12345"
  }
});

describe('[ endpoints / API graph meta ]', () => {

  it("should return a response with object API response", async () => {
    // Arrange
    const expected = {
      data: {
        height: expect.any(Number),
        is_silhouette: expect.any(Boolean),
        url: expect.any(String),
        width: expect.any(Number),
      }
    };

    // Act
    const { data: result } = await metaApiClient.get("/facebook/picture?redirect=false");

    // Assert
    expect(result).toEqual(expected);
  });

});
