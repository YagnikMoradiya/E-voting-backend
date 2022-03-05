const GenderType = {
  male: "MALE",
  female: "FEMALE",
  other: "OTHER",
};

const RoleType = {
  voter: "VOTER",
  candidate: "CANDIDATE",
};

const RequestType = {
  pending: "PENDING",
  declined: "DECLINED",
  accepted: "ACCEPTED",
};

const ElectionFilterType = {
  past: "PAST",
  current: "CURRENT",
  upcoming: "UPCOMING"
}

export { GenderType, RoleType, RequestType, ElectionFilterType };
