import { MemberEntity, RepositoryEntity } from '../../model';
import { members } from './mockData';



const baseURL = 'https://api.github.com/orgs/lemoncode';
const userURL = 'https://api.github.com/user';
const repoURL = 'https://api.github.com/orgs/lemoncode/repos';
let mockMembers = members;

const fetchMembers = (): Promise<MemberEntity[]> => {
  return Promise.resolve(mockMembers);
};

const fetchMembersAsync = (): Promise<MemberEntity[]> => {
  const membersURL = `${baseURL}/members`;

  return fetch(membersURL)
    .then((response) => (response.json()))
    .then(mapToMembers);
};

const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
  return githubMembers.map(mapToMember);
};

const mapToRepositories = (githubRepositories: any[]): RepositoryEntity[] => {
  return githubRepositories.map(mapToRepository);
};

const mapToRepository = (githubRepository: any):RepositoryEntity => {
  return{
    id: githubRepository.id,
    name: githubRepository.name,
    description: githubRepository.description
  }
}
const mapToMember = (githubMember): MemberEntity => {
  return {
    id: githubMember.id,
    login: githubMember.login,
    avatar_url: githubMember.avatar_url,
  };
};

const saveMember = (member: MemberEntity): Promise<boolean> => {
  const index = mockMembers.findIndex(m => m.id === member.id);

  index >= 0 ?
    updateMember(member, index) :
    insertMember(member);

  return Promise.resolve(true);
};

const updateMember = (member: MemberEntity, index: number) => {
  mockMembers = [
    ...mockMembers.slice(0, index),
    member,
    ...mockMembers.slice(index + 1),
  ];
};

const insertMember = (member: MemberEntity) => {
  member.id = mockMembers.length;

  mockMembers = [
    ...mockMembers,
    member,
  ];
};

const fetchMemberById = (id: number): Promise<MemberEntity> => {
  const member = mockMembers.find(m => m.id === id);

  return Promise.resolve(member);
}

const fetchMemberByIdAsync = (id: number): Promise<MemberEntity> => {
  const membersURL = `${userURL}/${id}`;
  return fetch(membersURL)
    .then((response) => (response.json()))
    .then(mapToMember);
}

const fetchRepositoriesAsync = (): Promise<RepositoryEntity[]> => {
  const repositoryURL = `${repoURL}`;

  return fetch (repositoryURL)
    .then((response) => (response.json()))
    .then(mapToRepositories);
}

export const memberAPI = {
  fetchMembers,
  fetchMembersAsync,
  saveMember,
  fetchMemberById,
  fetchMemberByIdAsync,
  fetchRepositoriesAsync,
};
