import 'package:dartz/dartz.dart';
import 'package:warehouse/features/auth/data/model/user_login_model.dart';

import '../../../../core/errors/failures.dart';
import '../repositories/auth_repository.dart';

class LoginUseCase {
  final AuthRepository authRepository;

  LoginUseCase(this.authRepository);

  Future<Either<Failure, UserLogin>> call(String email, String password) async {
    return await authRepository.login(email, password);
  }
}