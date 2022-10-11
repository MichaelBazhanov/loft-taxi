import { recordSaga } from "../recordSaga";
import { coordinates } from "../modules/route";
import { serverGetRoutes } from "../api";

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { getRoutesCoordinates } from "../modules/route";

// jest.mock('../api', () => ({ serverLogin: jest.fn(() => true) }))
jest.mock("../api"); //Мы мокаем api для того что бы была доступна функция serverLogin внутри теста

describe("coordinates", () => {
  describe("#GET_ROUTES_COORDINATES", () => {
    it("Получение координат через api", async () => {
      serverGetRoutes.mockImplementation(async () => [
        ["1", "2"],
        ["3", "4"],
        ["5", "6"],
      ]);

      const dispatched = await recordSaga(
        coordinates, // сама сага
        getRoutesCoordinates() // action на который тригерим эту сагу
      );

      expect(dispatched).toEqual([
        {
          type: "ROUTES_COORDINATES_SUCCESS",
          payload: {
            coordinates: [
              ["1", "2"],
              ["3", "4"],
              ["5", "6"],
            ],
          },
        },
      ]);
    });
    // ===============================================================================================
    it("Не получение координат через api", async () => {
      serverGetRoutes.mockImplementation(async () => ({}));

      const dispatched = await recordSaga(
        coordinates, // сама сага
        getRoutesCoordinates() // action на который тригерим эту сагу
      );

      expect(dispatched).toEqual([
        {
          type: "SHOW_NOTIFICATION",
          payload: {
            type: "warning",
            text: "Внимание! Обнаружена ошибка построения адресов.",
          },
        },
        {
          type: "ROUTES_COORDINATES_FAILURE",
          payload: {
            error: {
              name: "Error",
              message: "serverGetRoutes пришли необрабатываемые данные!",
            },
          },
        },
      ]);
    });
  });
});
