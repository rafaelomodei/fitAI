interface IVector {
  x: number;
  y: number;
  z: number;
}

interface IAngleBetweenVectors {
  vectorA: IVector;
  vectorB: IVector;
  vectorC: IVector;
}

const angleBetweenVectors = (props: IAngleBetweenVectors): number => {
  const { vectorA, vectorB, vectorC } = props;

  // const dAB = {
  //   x: vectorA.x - vectorB.x,
  //   y: vectorA.y - vectorB.y,
  //   z: vectorA.z - vectorB.z,
  // };

  // const k = Math.sqrt(dAB.x * dAB.x + dAB.y * dAB.y + dAB.z * dAB.z);

  // Vetor AB = B - A
  const vectorAB = {
    x: vectorB.x - vectorA.x,
    y: vectorB.y - vectorA.y,
    z: vectorB.z - vectorA.z,
  };

  // Vetor BC = C - B
  const vectorBC = {
    x: vectorC.x - vectorB.x,
    y: vectorC.y - vectorB.y,
    z: vectorC.z - vectorB.z,
  };

  // Calcula o produto escalar dos dois vetores
  const dotProduct =
    vectorAB.x * vectorBC.x + vectorAB.y * vectorBC.y + vectorAB.z * vectorBC.z;

  const distanceA =
    vectorAB.x * vectorAB.x + vectorAB.y * vectorAB.y + vectorAB.z * vectorAB.z;

  const distanceB =
    vectorBC.x * vectorBC.x + vectorBC.y * vectorBC.y + vectorBC.z * vectorBC.z;

  // Calcula o comprimento (magnitude) de cada vetor
  const magnitudeA = Math.sqrt(distanceA);
  const magnitudeB = Math.sqrt(distanceB);

  // Calcula o cosseno do ângulo entre os vetores usando o produto escalar e as magnitudes
  const cosineTheta = dotProduct / (magnitudeA * magnitudeB);

  // Calcula o ângulo em radianos usando a função arccos
  const angleInRadians = Math.acos(cosineTheta);

  return angleInRadians;
};

const distanceDBetweenTheTwoStraightLines = (
  vectorA: IVector,
  vectorB: IVector
) => {
  const dotAB =
    vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z;

  const dotB = vectorB.x ** 2 + vectorB.y ** 2 + vectorB.z ** 2;

  const magnitudeAB = Math.sqrt(dotAB);
  const d = magnitudeAB / dotB;

  return d;
};

const euclideanDistance = (props: IAngleBetweenVectors): number => {
  const { vectorA, vectorB } = props;

  const diffX = vectorB.x - vectorA.x;
  const diffY = vectorB.y - vectorA.y;
  const diffZ = vectorB.z - vectorA.z;

  const distance = Math.sqrt(diffX ** 2 + diffY ** 2 + diffZ ** 2);
  return distance;
};

export {
  angleBetweenVectors,
  euclideanDistance,
  distanceDBetweenTheTwoStraightLines,
};
